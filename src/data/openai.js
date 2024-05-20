// Move the iframe code here?

import "https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/src/sha256.min.js";
import "https://cdn.jsdelivr.net/npm/near-api-js@2.1.3/dist/near-api-js.min.js";

const keyStore = new nearApi.keyStores.InMemoryKeyStore();
let account;
const networkId = "mainnet";

const config = {
  keyStore, // instance of UnencryptedFileSystemKeyStore
  networkId: networkId,
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};

async function createAccount() {
  const keypair = nearApi.utils.KeyPairEd25519.fromRandom();
  const accountId = Buffer.from(keypair.publicKey.data).toString("hex");
  await keyStore.setKey(networkId, accountId, keypair);
  const near = await nearApi.connect(config);
  account = await near.account(accountId);
  return { secretKey: keypair.secretKey, accountId };
}

async function useAccount(secretKey) {
  const keypair = nearApi.utils.KeyPair.fromString(secretKey);
  const accountId = Buffer.from(keypair.publicKey.data).toString("hex");
  await keyStore.setKey(networkId, accountId, keypair);
  const near = await nearApi.connect(config);
  account = await near.account(accountId);
  return accountId;
}

async function create_ask_ai_request_body(messages, model) {
  const accountId = account.accountId;

  const messagesStringified = JSON.stringify(messages);
  const deposit = 50_00000_00000_00000_00000n;

  const message_hash = sha256(messagesStringified);

  const receiverId = "jsinrust.near";
  const method_name = "ask_ai";
  const gas = "30000000000000";
  const publicKey = await account.connection.signer.getPublicKey(
    account.accountId,
    account.connection.networkId
  );

  let accessKey;

  try {
    accessKey = (await account.findAccessKey()).accessKey;
  } catch (e) {
    throw new Error(JSON.stringify("Balance is empty.", null, 1));
  }

  const nonce = ++accessKey.nonce;
  const recentBlockHash = nearApi.utils.serialize.base_decode(accessKey.block_hash);

  const transaction = nearApi.transactions.createTransaction(
    account.accountId,
    publicKey,
    receiverId,
    nonce,
    [
      nearApi.transactions.functionCall(
        method_name,
        {
          message_hash,
        },
        gas,
        deposit
      ),
    ],
    recentBlockHash
  );
  const [txHash, signedTx] = await nearApi.transactions.signTransaction(
    transaction,
    account.connection.signer,
    account.accountId,
    account.connection.networkId
  );

  return JSON.stringify({
    signed_transaction: Buffer.from(signedTx.encode()).toString("base64"),
    transaction_hash: nearApi.utils.serialize.base_encode(txHash),
    sender_account_id: accountId,
    messages: messages,
    model: model,
  });
}

async function create_and_send_ask_ai_request(messages, model) {
  console.log("model", model);
  try {
    const requestbody = await create_ask_ai_request_body(messages, model);
    const airesponse = await fetch(
      "https://near-openai-50jjawxtf-petersalomonsen.vercel.app/api/openai",
      {
        method: "POST",
        body: requestbody,
      }
    ).then((r) => r.json());
    if (airesponse.error) {
      throw new Error(JSON.stringify(airesponse.error, null, 1));
    }
    return airesponse.choices[0].message.content;
  } catch (e) {
    console.log(e.message);
    window.parent.postMessage({ command: "error", error: e.message }, "*");
  }
}
