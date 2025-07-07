# LocalBox

Self-hosted Dropbox-style app for LAN file sharing.

## Quick Start
```bash
git clone <repo>
cd drop-box
cp .env.example .env
docker compose up --build
```
Open `http://<HOST_IP>:3000` in your browser.

## Configuration
- Change mount point by editing `.env` (`DJANGO_MEDIA_ROOT`).
- Change host IP via `NEXT_PUBLIC_API_URL` in `.env`.
- Backup: `rsync -av /mnt/localbox /path/to/backup/drive`.

## Drive Check
`tools/check_drive.sh` ensures `/mnt/localbox` is writable before Django starts.
