# reliable
Open-source reliability analysis platform that transforms failure data into actionable maintenance insights using Weibull analysis.

Upload failure history data and receive:

- MTBF calculation
- Weibull analysis
- Reliability metrics
- Failure pattern interpretation
- Professional PDF reports

## Quick start

### Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API runs at `http://127.0.0.1:8000`.

### Frontend

```powershell
cd frontend
copy .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

### CSV file to upload

Use a comma-separated file with this structure:

```csv
asset_id,time_to_failure
Motor,2041.20
Motor,4074.71
```

- **asset_id** — equipment name or ID
- **time_to_failure** — positive numeric operating time until failure
- Minimum **2 failure rows** required
- Sample file: `examples/sample_failure_data.csv`

## Features

- CSV upload
- Automatic Weibull fitting
- Reliability recommendations
- PDF report generation
- Free and open-source

## Roadmap

### v0.1

- CSV upload
- MTBF
- Weibull analysis
- PDF export

### v0.2

- Multiple assets
- Comparative analysis

### v0.3

- FMEA support

## License

MIT
