# AIBoard (Same-Network Digital Board)

Write from your phone/tablet and see it live on your computer screen.

## What this app supports

- Writer screen (for mobile/tablet)
- Viewer screen (for computer display)
- Multiple board sets by name (for example: `set1`, `set2`)
- Devices only need to be on the same Wi-Fi/network

## Run

1. Open terminal in this folder.
2. Install packages:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   npm start
   ```
4. Server runs at:
   - Local computer: `http://localhost:3000`
   - LAN (same network): `http://192.168.55.101:3000`

## Use on two devices

1. On your **computer screen**, open:
   - `http://192.168.55.101:3000`
   - Select board name (example `set1`)
   - Click **Open Viewer (Computer)**
2. On your **mobile/tablet**, open the same URL:
   - `http://192.168.55.101:3000`
   - Use the same board name (`set1`)
   - Click **Open Writer (Mobile/Tab)**
3. Start writing on mobile/tablet. It appears instantly on computer.

## Two Sets Example

- Set A: board name `set1`
- Set B: board name `set2`

Use matching names on writer + viewer for each set.

## Notes

- If phone cannot connect, verify both devices are on same Wi-Fi.
- Allow Node.js through Windows Firewall when prompted.
- Keep the terminal running while using the board.
