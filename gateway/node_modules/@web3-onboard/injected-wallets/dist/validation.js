import Joi from 'joi';
import { validate } from '@web3-onboard/common';
const walletModule = Joi.object({
    label: Joi.string().required(),
    getIcon: Joi.function().arity(0).required(),
    getInterface: Joi.function().maxArity(1).required(),
    injectedNamespace: Joi.string().required(),
    checkProviderIdentity: Joi.function().arity(1).required(),
    platforms: Joi.array().items(Joi.string())
});
const wallets = Joi.array().items(walletModule);
const filter = Joi.object().pattern(/\w+/, Joi.any().allow(Joi.boolean(), Joi.array().items(Joi.string())));
const walletOptions = Joi.object({
    custom: wallets,
    filter,
    displayUnavailable: Joi.boolean(),
    walletUnavailableMessage: Joi.function(),
    sort: Joi.function()
});
export const validateWalletOptions = (data) => validate(walletOptions, data);
