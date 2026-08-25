# OutLate Beta 9 — Transport preferences

## New
A compact **Ways I’ll get home** control lets the user choose which public transport they are actually willing to use late at night:

- Tube
- Overground / Elizabeth line
- National Rail
- Bus / night bus
- DLR / tram

The choices are remembered on the device.

## Why it matters
The selected modes are passed into the background TfL journey calculation. That means the event verdict can genuinely change based on the user's preferences — particularly on weeknights when night buses may continue after rail and Tube services finish.

The site still does **not** display a route or try to be Citymapper. It only presents the event decision:
- stay to the end,
- stay almost to the end,
- or leave by a specific time.

The result also states whether night buses were included or excluded, so the assumption is clear.

## Existing behaviour retained
- Event-first design
- Permanent HH : MM curfew / end-time control
- Venue-size crowd/exit modelling
- 8-minute safety margin
- Live transport data kept in the background
