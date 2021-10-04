import { SmartContract, ntoy, encodeBase64, decodeUTF8, ONE_NEAR, encodeBase58 } from "near-api-lite";
import { readFileSync, appendFileSync } from "fs";
import { inspect } from "util";
import { configSigner, multiConfigSigner, getSmartContract, getFactoryContract, getDaoContract, TARGET_REMOTE_UPGRADE_CONTRACT_ACCOUNT, SPUTNIK_WASM_PATH, SPUTNIK_FACTORY_MAINNET, SPUTNIK_FACTORY_TESTNET, TOKEN_FACTORY_MAINNET, TOKEN_FACTORY_TESTNET } from "../util/setup";
import * as fs from 'fs';
import * as sha256 from "near-api-lite/lib/utils/sha256.js";
import * as network from "near-api-lite/lib/network.js";

export async function factoryDeployCode(options: Record<string, any>): Promise<void> {
  network.setCurrent(options.network);
  const smartC = getSmartContract(options.daoAcc,options.accountId);
  configSigner(smartC, smartC.contract_account);
  console.log(inspect(smartC, false, 5, true));
  const code = readFileSync("/home/josecanales/Github/sputnikdao-cli/res/sputnikdao_factory2.wasm");
  const result = await smartC.deployCode(code);
  const init = await smartC.call("new",{});

}

export async function daoGetDaoList(options: Record<string, any>): Promise<void> {
    network.setCurrent(options.network);
    const smartC = getSmartContract(options.daoAcc,options.accountId);
    //const resultsmartC = await smartC.view("get_smart_contract", { from_index: 0, limit: 50 });
    const SC = getFactoryContract(options.daoAcc,options.accountId);
    const resultSc = await SC.view("get_dao_list", { from_index: 0, limit: 50 });
    let idbounty:number = options.id;
    console.log(inspect(resultSc, false, 5, true));
    console.log(inspect(smartC, false, 5, true));
  }