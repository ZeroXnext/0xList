#!/usr/bin/env node
import { entry } from "../src";
import addBumpCommand from "../src/commands/bump";
import addAggregate from "../src/commands/aggregate";
import addSync from "../src/commands/sync";
import { loader } from "@tokenlist-builder/core";

const config = await loader();

addSync(entry, config);
addAggregate(entry, config);
addBumpCommand(entry, config);
entry.strictCommands().parse();
