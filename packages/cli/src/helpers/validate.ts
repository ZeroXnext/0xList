import Ajv from "ajv";
import { TokenList, tokenListSchema } from "@tokenlist-builder/core";
import addFormats from "ajv-formats";

export default function validate(tokenList: TokenList) {
  const ajv = new Ajv();
  const validator = ajv.addSchema(tokenListSchema);
  addFormats(ajv);

  return [
    validator.validate(tokenListSchema, tokenList),
    validator.errors?.map((item) => `${item.instancePath}:${item.message}`)?.join(",\n"),
  ];
}
