/* =====================================================================
   Axiom Linux Javascript - Terminal simulator logic
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const consoleDiv = document.getElementById("console");

    // Static definition of neofetch system stats
    const statsText = `   /\\_/\\      mason@axiom-pc
  ( o.o )     --------------
   > ^ <      OS: Axiom GNU/Linux (Commit 2)
  /     \\     Kernel: 6.12.95+deb13-amd64
 |       |    Uptime: 13 years, 0 months (Dev Age!)
  \\_____/     Packages: Declarative (NixOS-Like) + Multi-distro Containers
              Shell: bash / python3
              Resolution: 1920x1080
              DE/WM: XFCE / Openbox
              Theme: Monochrome Charcoal
              Accent Color: #60a5fa (Terminal Blue)
              Architect: Masorooni (Age 13)`;

    const commands = {
        help: () => `Available commands:
  about    - What is Axiom GNU/Linux?
  features - View key system architecture highlights
  install  - How to install Axiom on your disk
  motd     - Message of the Day from the creator
  fetch    - Display system information (neofetch style)
  clear    - Clear the terminal screen`,
        
        about: () => `Axiom GNU/Linux is an elegant, lightweight, security-hardened Linux distribution.
It is built from the ground up as a "Centrist Distro" targeting intermediate users
who want absolute DIY configuration control without breaking their system baseline.`,
        
        features: () => `[01] DECLARATIVE PACKAGE SYSTEM: NixOS-like configuration structure.
     Configure your software list in a single file and reproduce it instantly.
[02] CENTRIST DISTRO: Perfectly balanced between Purists and Intermediates.
     Gives you complete custom control without needing a Ph.D. in kernel building.
[03] CONTAINER MULTI-DISTRO: Run applications compiled for any Linux distribution
     natively and securely inside lightweight local isolation containers.
[04] INDEPENDENT SPIRIT: Designed, architected, and coded from scratch
     by 13-year-old developer Masorooni.`,
        
        install: () => `To install Axiom Linux to your hard drive:
1. Boot the VM or physical hardware using the Axiom Live ISO.
2. Open a terminal and run the interactive installer:
   $ sudo axiom-install
3. Configure your username, disk, and settings on the dashboard.
4. Confirm changes and reboot.`,
        
        motd: () => `Hello! Thanks for picking up Axiom!
The build you are using is a "Commit" build, a VERY early alpha.
I am in fact a solo dev! This is a passion project of mine.
Not to mention the fact I'm 13 years old working on this.

    +
  +++++
    +     "Stand fast in the faith.
    +      Be brave. Be strong."
    +
    +          — 1 Cor 16:13

- Masorooni`,
        
        fetch: () => statsText
    };

    // System Boot Animation Sequence
    const bootLines = [
        "Axiom bootloader v2.10 loaded...",
        "Detecting system hardware... UEFI Mode detected.",
        "Mounting root filesystem (EXT4) on /dev/sda3... [ OK ]",
        "Loading kernel module: ext4... loaded.",
        "Starting udev device manager... [ OK ]",
        "Purging live-session artifacts... [ OK ]",
        "Configuring network interface: NetworkManager... [ OK ]",
        "Network link active. Localhost IPv4 bound.",
        "Starting system services... systemd-resolved, timesyncd active.",
        "Axiom GNU/Linux (Commit 2 Pre-release) initialized.",
        "Type 'help' to see all available commands.\n"
    ];

    // Helper to print a line to the console
    function printLine(text, className = "") {
        const line = document.createElement("div");
        line.className = `terminal-line ${className}`;
        line.innerText = text;
        consoleDiv.appendChild(line);
        consoleDiv.scrollTop = consoleDiv.scrollHeight;
    }

    // Interactive Input Line handler
    function appendInputLine() {
        const inputLine = document.createElement("div");
        inputLine.className = "terminal-input-line";
        
        const prompt = document.createElement("span");
        prompt.className = "terminal-prompt";
        prompt.innerText = "axiom@pc:~$";
        
        const wrapper = document.createElement("div");
        wrapper.className = "terminal-input-wrapper";
        
        const input = document.createElement("input");
        input.type = "text";
        input.className = "terminal-input";
        input.autofocus = true;
        
        const caret = document.createElement("span");
        caret.className = "terminal-caret";
        
        wrapper.appendChild(input);
        wrapper.appendChild(caret);
        inputLine.appendChild(prompt);
        inputLine.appendChild(wrapper);
        consoleDiv.appendChild(inputLine);
        
        // Keep focus on input
        input.focus();
        document.addEventListener("click", () => input.focus());
        
        // Handle command input
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const commandText = input.value.trim();
                input.disabled = true;
                caret.remove();
                
                // Print command echo
                printLine(`axiom@pc:~$ ${commandText}`);
                
                if (commandText) {
                    const lowercaseCmd = commandText.toLowerCase();
                    if (lowercaseCmd === "clear") {
                        consoleDiv.innerHTML = "";
                    } else if (commands[lowercaseCmd]) {
                        printLine(commands[lowercaseCmd](), "output");
                    } else {
                        printLine(`axiom-sh: command not found: ${commandText}. Type 'help' for suggestions.`, "output");
                    }
                }
                
                appendInputLine();
            }
        });
        
        consoleDiv.scrollTop = consoleDiv.scrollHeight;
    }

    // Animate Boot Sequence
    let lineIdx = 0;
    function printBootLog() {
        if (lineIdx < bootLines.length) {
            let delay = 150;
            // Introduce variable timings for realism
            if (lineIdx === 2) delay = 350;
            if (lineIdx === 6) delay = 400;
            
            printLine(bootLines[lineIdx]);
            lineIdx++;
            setTimeout(printBootLog, delay);
        } else {
            appendInputLine();
        }
    }

    // Start boot sequence
    printBootLog();
});
