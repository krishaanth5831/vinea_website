# Running the 5-Agent Build in tmux — a guided walkthrough

This is the long version of the launch instructions, written to be **learned from**, not just copy-pasted. Every command is explained: what it does, why it's here, and what would happen without it. If you just want the commands, jump to the [Cheat Sheet](#cheat-sheet) at the bottom.

---

## 0. The mental model first

Before any commands, here's the picture of what we're building and why each piece exists.

- **The website** is a Next.js project living in a normal Windows folder: `C:\Users\20252433\Desktop\website_vinea`.
- **The builders** are 5 separate Claude Code processes. Each is a full, independent agent with its own conversation. They are *not* aware of each other in memory.
- **They coordinate through files.** Because they all open the same repo folder, one agent writing `docs/content/site-content.json` is immediately readable by another. The repo *is* their shared whiteboard. That's the whole trick — there's no magic message bus, just files on disk.
- **tmux** is what lets you run all 5 at once in one window and watch them side by side.

So the job below is: get into the right environment (WSL), open the project, start tmux, split it into 5 boxes, and launch one agent per box.

---

## 1. Why WSL at all?

tmux is a Linux/Unix program. It does not exist on native Windows. Your machine has **WSL** (Windows Subsystem for Linux) — a real Linux (Ubuntu) running inside Windows — and that's where tmux lives. We already installed everything the agents need *inside* Ubuntu: Node.js, the Linux-native `claude`, and tmux itself.

```bash
wsl -d Ubuntu
```

**What it does:** drops you from PowerShell into a bash shell inside the Ubuntu Linux distribution.
- `wsl` — the Windows command that launches the Linux subsystem.
- `-d Ubuntu` — `-d` means "distro". You have more than one (there's also a stripped-down `docker-desktop` one that has no tmux), so we explicitly pick **Ubuntu**. Without `-d Ubuntu` you'd land in the default distro, which is the wrong one.

After this your prompt changes (something like `krishaanth_k7@machine:~$`) — the `$` and the username tell you you're now in Linux, not PowerShell.

---

## 2. Go to the project folder

```bash
cd /mnt/c/Users/20252433/Desktop/website_vinea
```

**What it does:** changes directory to the project.
- `cd` = "change directory", the universal command for moving around a filesystem.
- `/mnt/c/...` — this is the key WSL concept. Your Windows `C:` drive is *mounted* inside Linux at `/mnt/c`. So Windows `C:\Users\...\website_vinea` becomes Linux `/mnt/c/Users/.../website_vinea`. Same files, two addresses. This is exactly why you can edit them in VS Code on Windows **and** have the Linux agents work on them at the same time.
- Note the slashes flip: Windows uses `\`, Linux uses `/`.

You can confirm you're in the right place with `pwd` ("print working directory") and `ls` ("list" the files — you should see `docs`, `scripts`, `README.md`).

---

## 3. Get on the dev branch

```bash
git checkout dev
```

**What it does:** switches your working files to the `dev` branch.
- `git checkout <branch>` moves you onto that branch; new commits you make now land on `dev`, not `main`.
- **Why:** `main` is your clean, known-good line. The agents are about to generate a lot of work-in-progress. Doing it on `dev` keeps `main` safe; when a milestone is solid you merge `dev` into `main`.
- Check which branch you're on anytime with `git branch --show-current`.

---

## 4. Load the toolbelt

```bash
source ~/.vinea_env.sh
```

**What it does:** loads Node.js and the correct `claude` into your current shell.
- `source` runs the commands from a file *in your current shell* (as opposed to running the file in a separate child shell, which would let the changes evaporate when it finished). We need the effect — updated `PATH`, Node available — to stick around in *this* terminal.
- `~` is shorthand for your home directory (`/home/krishaanth_k7`). So `~/.vinea_env.sh` is the small setup script we wrote during installation.
- **Why it's needed:** Node was installed via `nvm` (a per-user Node manager), which isn't active until it's loaded. Also, without this, typing `claude` could accidentally run the *Windows* copy of Claude through WSL's compatibility layer — which misbehaves. This script guarantees you get the **Linux-native** `claude`. Verify with `which claude` — it should print a path under `/home/...`, **not** under `/mnt/c/...`.

> You repeat this `source` line (plus the `cd`) in **every** tmux pane, because each pane is its own fresh shell that doesn't inherit these settings automatically.

---

## 5. One-time: authenticate Claude

The very first time you ever run `claude` on this Linux install, it needs you to log in:

```bash
claude
```

Follow the login prompt (it opens a browser / gives you a code). Once done, **quit it** (type `/exit` or press `Ctrl+c` twice). Auth is stored on the machine, so all 5 agents afterward start already logged in. You only ever do this once.

---

## 6. Start a tmux session

```bash
tmux new -s vinea
```

**What it does:** starts a new tmux session named `vinea`.
- `tmux` — the terminal multiplexer. "Multiplexer" = it lets one terminal window hold many shells (panes) and keeps them alive even if you disconnect.
- `new` — create a new session.
- `-s vinea` — `-s` = "session name". Naming it `vinea` means you can later reattach with `tmux attach -t vinea` instead of hunting for a random ID.

Your screen now has a green status bar along the bottom — that's tmux. You're inside one pane (one shell) for the moment.

### The single most important tmux concept: the prefix
tmux doesn't want to steal every keystroke from the programs running inside it, so all tmux commands start with a **prefix key**: **`Ctrl+b`**. You press `Ctrl+b`, *let go*, then press the actual command key.

So "`Ctrl+b` then `%`" means: hold Ctrl and b together, release both, then tap `%`. It is **not** `Ctrl+b+%` all at once.

---

## 7. Split into 5 panes

A pane is one shell — one agent will live in each. Two split commands:

| Command | Keys | What happens |
|---|---|---|
| Split left/right | `Ctrl+b` then `%` | current pane divides into two columns |
| Split top/bottom | `Ctrl+b` then `"` | current pane divides into two rows |
| Move to another pane | `Ctrl+b` then an arrow key | focus jumps that direction |
| Auto-arrange into a grid | `Ctrl+b` then `Alt+5` | tiles all panes evenly |

A reliable recipe to get 5 even boxes:
1. `Ctrl+b` `%`  → now 2 panes
2. `Ctrl+b` `"`  → 3 panes
3. `Ctrl+b` `←` to move back to the big left pane, then `Ctrl+b` `"` → 4 panes
4. `Ctrl+b` `→` to a right pane, `Ctrl+b` `"` → 5 panes
5. `Ctrl+b` `Alt+5` → snap them all into a clean grid

If the arrow/Alt combos feel fiddly, you can type a command directly: press `Ctrl+b` then `:` (this opens a tmux command line at the bottom), type `select-layout tiled`, and press Enter. That force-tiles whatever panes exist.

### Other navigation you'll want
- **Zoom one pane to fullscreen (and back):** `Ctrl+b` then `z`. Great for reading one agent closely, then popping back to the grid.
- **Scroll up through a pane's history:** `Ctrl+b` then `[`, then use arrows / PageUp. Press `q` to leave scroll mode. (Normally the terminal won't let you scroll back through long agent output — this is how.)

---

## 8. Prep every pane

Click (or `Ctrl+b` + arrow) into each of the 5 panes and run the same two lines first:

```bash
cd /mnt/c/Users/20252433/Desktop/website_vinea && source ~/.vinea_env.sh
```

- The `&&` means "run the second command only if the first succeeded." A tiny safety habit: if the `cd` failed (typo in path), it won't go on to `source` in the wrong place.
- Why in every pane: again, each pane is an independent shell that didn't inherit your earlier setup.

---

## 9. Launch one agent per pane

Each agent's full instructions already live in the repo at `scripts/agent-prompts/`. The cleanest launch is to feed that file in as the agent's opening message:

```bash
# Pane 0 — Orchestrator (scaffolds the app, integrates everything, runs git)
claude "$(cat scripts/agent-prompts/0-orchestrator.md)"

# Pane 1 — Vault-Researcher (reads your Obsidian vault, writes the site content)
claude "$(cat scripts/agent-prompts/1-vault-researcher.md)"

# Pane 2 — Design-System (theme tokens, typography, UI primitives)
claude "$(cat scripts/agent-prompts/2-design-system.md)"

# Pane 3 — Animation (smooth scroll, scroll reveals, the hero animation)
claude "$(cat scripts/agent-prompts/3-animation.md)"

# Pane 4 — Sections (builds each page section, fills it with the content)
claude "$(cat scripts/agent-prompts/4-sections.md)"
```

**Decoding `claude "$(cat scripts/agent-prompts/0-orchestrator.md)"`:**
- `cat <file>` prints a file's contents to the screen ("concatenate" — its original job was joining files).
- `$(...)` is **command substitution**: bash runs what's inside, then drops the *output* into the command in its place. So `$(cat 0-orchestrator.md)` becomes the entire text of that file.
- Wrapping it in `"..."` keeps that whole block as one single argument to `claude` (without the quotes, every space/newline would be treated as a separate argument and it would break).
- Net effect: `claude` launches with the orchestrator's full prompt as its first message — same as if you'd pasted the file in by hand.

If you'd rather type a short kickoff and let the agent read its own brief, this works just as well:

> *"You are the Orchestrator for this repo. Read docs/AGENTS.md and scripts/agent-prompts/0-orchestrator.md, then begin."*

…and the same for panes 1–4 with their numbered files.

---

## 10. The order to start them (this matters)

The agents depend on each other's output, so starting them all at once just makes the later ones sit and wait. Sequence:

1. **Pane 0 (Orchestrator) first, alone.** It runs `create-next-app` to scaffold the project. Nothing else can build until the app skeleton + `package.json` exist. Let it finish and commit.
2. **Then Pane 1 (Vault-Researcher) and Pane 2 (Design-System) together.** Neither needs the other — one writes content, one writes styling tokens — so they run in parallel.
3. **Then Pane 3 (Animation),** once Design-System has committed the theme variables it builds on.
4. **Then Pane 4 (Sections) last,** once there's content (pane 1) + UI primitives (pane 2) + motion components (pane 3) to assemble.

Watch progress in two places: `docs/TASKBOARD.md` (the agents tick off their own rows) and VS Code's Source Control panel (every file change shows as a diff).

---

## 11. Seeing it all in VS Code

Open the folder in VS Code (on Windows, or `code .` from the WSL prompt while in the project):

- **File diffs:** the Explorer and **Source Control** tab update live as agents write files. This is the best way to review *what* they changed — click any file in Source Control to see a red/green diff.
- **The agents' terminals inside VS Code:** open VS Code's integrated terminal (`` Ctrl+` ``), make sure it's a WSL/Ubuntu terminal, and run `tmux attach -t vinea`. The 5-pane grid appears right inside VS Code. Many people instead keep tmux in a separate Windows Terminal window on a second screen and use VS Code purely for reading diffs — either is fine.

---

## 12. Leaving and coming back

tmux keeps running even if you close the window — that's its superpower.

- **Detach (leave it running in the background):** `Ctrl+b` then `d`. You drop back to a normal shell; the agents keep working.
- **Reattach later:** `tmux attach -t vinea` (the `-t` = "target" the session by name).
- **List sessions:** `tmux ls`.
- **Kill it for good when done:** `tmux kill-session -t vinea`.

---

## 13. Wrapping up a work session (git)

You're working on `dev`. Have the Orchestrator commit there as it goes, or do it yourself:

```bash
git add -A                      # stage every change
git commit -m "WIP: ..."        # save a snapshot with a message
git push                        # send dev up to GitHub
```
When a milestone is stable and you want it on the main line:
```bash
git checkout main               # move to main
git merge dev                   # bring dev's work into main
git push                        # publish main
git checkout dev                # go back to dev to keep working
```

---

## Cheat Sheet

```bash
# enter + setup
wsl -d Ubuntu
cd /mnt/c/Users/20252433/Desktop/website_vinea
git checkout dev
source ~/.vinea_env.sh
tmux new -s vinea

# in each pane
cd /mnt/c/Users/20252433/Desktop/website_vinea && source ~/.vinea_env.sh
claude "$(cat scripts/agent-prompts/0-orchestrator.md)"   # 0..4 per pane
```

| Action | Keys / command |
|---|---|
| Split left/right | `Ctrl+b` `%` |
| Split top/bottom | `Ctrl+b` `"` |
| Move between panes | `Ctrl+b` arrow |
| Tile evenly | `Ctrl+b` `:` → `select-layout tiled` |
| Zoom a pane | `Ctrl+b` `z` |
| Scroll mode (q to exit) | `Ctrl+b` `[` |
| Detach | `Ctrl+b` `d` |
| Reattach | `tmux attach -t vinea` |
| List / kill sessions | `tmux ls` / `tmux kill-session -t vinea` |

**Start order:** Orchestrator → (Vault-Researcher + Design-System) → Animation → Sections.
