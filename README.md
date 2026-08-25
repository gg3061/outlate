# OutLate V7 — TfL-powered GitHub beta

This version removes the two manual journey fields.

## Flow
Event/venue → Home station → OutLate checks TfL Journey Planner → leave-by answer.

## Changes
- Direct browser call to TfL Unified Journey Planner API.
- No backend and no API key required for the anonymous beta tier.
- Tries rail/Tube/Overground/DLR/tram first.
- Falls back to broader TfL public transport if no rail-only journey is returned.
- Displays the actual TfL journey legs used.
- Calculates venue leave-by time backwards from the journey departure.
- Keeps venue exit, crowd, walking and 8-minute safety assumptions.
- Curfew/end-time control is split HH : MM so the colon is permanently visible.
- Manual last-departure and journey-duration fields are gone.

## Limitations
- London/TfL-focused beta.
- Unknown venues still need venue-size and end-time confirmation.
- Event finish/curfew information is still partly estimated unless an event source supplies it.
- TfL anonymous requests are rate-limited; a larger launch should use a registered key and likely a secure backend.

Uses Transport for London Journey Planner data.
