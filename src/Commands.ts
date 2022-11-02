import { Command } from "./interfaces/Command";
import { Ping } from "./commands/Ping";
import { Lookup } from "./commands/Lookup";

export const Commands: Command[] = [
    Ping,
    Lookup
]; 