# OutLate — streamlined beta

Main flow:
1. Venue
2. Home station
3. CAN I STAY?

Only if needed, OutLate asks for:
- venue scale (unknown venues only)
- expected finish / curfew (if not known)
- last useful departure + journey time (until live transport is integrated)

Known venues automatically set venue scale, and a small number have conservative curfew fallbacks.
Unknown UK venues still work via inferred/default venue scale.

Next major product milestone: automatic live public-transport lookup, which removes the final manual journey inputs.
