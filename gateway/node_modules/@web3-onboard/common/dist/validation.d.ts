import Joi from 'joi';
export type ValidateReturn = Joi.ValidationResult | null;
export declare function validate(validator: Joi.AnySchema<any>, data: unknown): ValidateReturn;
export declare const chainIdValidation: Joi.AlternativesSchema<any>;
export declare const chainNamespaceValidation: Joi.StringSchema<string>;
/** Related to ConnectionInfo from 'ethers/lib/utils' */
export declare const providerConnectionInfoValidation: Joi.ObjectSchema<any>;
export declare const chainValidation: Joi.ObjectSchema<any>;
