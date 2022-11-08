import { Command } from "./interfaces/Command";
import { Ping } from "./commands/Ping";
import { Lookup } from "./commands/Lookup";
import { InviteWave } from "./commands/InviteWave";
import { Blacklist } from "./commands/Blacklist";
import { Unblacklist } from "./commands/Unblacklist";
import { ChangePresence } from "./commands/ChangePresence";
import { Invite } from "./commands/Invite";

export const Commands: Command[] = [
    Ping,
    Lookup,
    Invite,
    InviteWave,
    Blacklist,
    Unblacklist,
    ChangePresence
]; 