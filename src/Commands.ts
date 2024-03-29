import { Command } from "./interfaces/Command";
import { Ping } from "./commands/Ping";
import { Lookup } from "./commands/Lookup";
import { InviteWave } from "./commands/InviteWave";
import { Blacklist } from "./commands/Blacklist";
import { Unblacklist } from "./commands/Unblacklist";
import { ChangePresence } from "./commands/ChangePresence";

export const Commands: Command[] = [
    Ping,
    Lookup,
    InviteWave,
    Blacklist,
    Unblacklist,
    ChangePresence
]; 