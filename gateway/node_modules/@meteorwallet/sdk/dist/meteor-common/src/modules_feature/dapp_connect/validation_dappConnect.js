"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZO_DappSignTransactionAction_UrlQuery = exports.ZO_DappSignInAction_Combined = exports.ZO_DappSignInAction_AllMethods = exports.ZO_DappSignInAction_SelectedMethods = exports.ZO_DappSignInAction_Base = void 0;
const zod_1 = require("zod");
const types_dappConnect_1 = require("./types_dappConnect");
exports.ZO_DappSignInAction_Base = zod_1.z.object({
    contract_id: zod_1.z.string(),
    // callback_url: z.string(),
    // network: z.nativeEnum(ENearNetwork),
    public_key: zod_1.z.string(),
});
exports.ZO_DappSignInAction_SelectedMethods = exports.ZO_DappSignInAction_Base.merge(zod_1.z.object({
    type: zod_1.z.literal(types_dappConnect_1.EMeteorWalletSignInType.SELECTED_METHODS),
    methods: zod_1.z.array(zod_1.z.string()).min(1),
}));
exports.ZO_DappSignInAction_AllMethods = exports.ZO_DappSignInAction_Base.merge(zod_1.z.object({
    type: zod_1.z.literal(types_dappConnect_1.EMeteorWalletSignInType.ALL_METHODS),
    methods: zod_1.z.undefined().optional(),
}));
exports.ZO_DappSignInAction_Combined = exports.ZO_DappSignInAction_SelectedMethods.or(exports.ZO_DappSignInAction_AllMethods);
exports.ZO_DappSignTransactionAction_UrlQuery = zod_1.z.object({
    callback_url: zod_1.z.string().min(2),
    transactions: zod_1.z.string().min(2),
    meta: zod_1.z.string().optional(),
});
//# sourceMappingURL=validation_dappConnect.js.map