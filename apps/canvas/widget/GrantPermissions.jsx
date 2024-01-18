const path = props.path;
const connected_account = context.accountId;

const social_contract_id = "social.near";

State.init({
  account: "",
});

let data = {
  accountId: state.account,
};

const accounts_granted_permissions = Near.view(
  social_contract_id,
  "debug_get_permissions",
  { account_id: connected_account }
);

const handleGrantAccount = () => {
  Near.call([
    {
      contractName: social_contract_id,
      methodName: "grant_write_permission",
      args: { predecessor_id: data.accountId, keys: [path] },
      deposit: "1",
    },
  ]);
};

const filtered_accounts_granted_permissions =
  accounts_granted_permissions &&
  accounts_granted_permissions.filter((permissions) => {
    return Object.keys(permissions[0])[0] === "AccountId";
  });

const map_filtered_accounts_granted_permissions =
  accounts_granted_permissions &&
  filtered_accounts_granted_permissions.map((filter) => {
    return filter[0].AccountId;
  });

return (
  <div class="d-flex flex-column gap-4">
    <div>
      <h4>Grant Permissions</h4>
      {!!data.accountId && (
        <>
          <p>
            You are granting write permissions to{" "}
            <span class="fw-bold">{data.accountId}</span>{" "}
          </p>
          <p>
            for the path: <span class="fw-bold">{path}</span>
          </p>
        </>
      )}
    </div>
    <div class="w-100 d-flex gap-4">
      <input id="accountid" type="text" value={state.account}></input>
      <button
        onClick={() => {
          handleGrantAccount();
        }}
        disabled={
          !state.account ||
          !/.near$/.test(state.account) ||
          state.account === connected_account
        }
      >
        Grant
      </button>
    </div>

    <a href="https://near.social/#/mob.near/widget/MainPage.Post.Page?accountId=root.near&blockHeight=85026336">
      Learn more (Illia's post)
    </a>
  </div>
);
