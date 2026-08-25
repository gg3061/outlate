# OutLate V6

## Main changes
- New two-stop transit-line logo. The underline is exactly the width of OUTLATE.
- Hero changed from "Can I stay?" to "Know when to leave."
- Main action is "CHECK MY NIGHT".
- Event or venue can be entered in one field (for example: "Superchunk at Moth Club").
- Known venue names are detected even when included inside a longer event description.
- Clearer suggested route: venue → venue-area station/transport → home station.
- Curfew and last-departure fields are numeric-friendly masked time inputs; typing 2245 becomes 22:45.
- Targeted web-search link is generated for the event/venue and today's date.
- Architecture is ready for zero-click Ticketmaster Discovery API matching via `TICKETMASTER_API_KEY`.
  When configured, it can match today's event and use a listed event end time when Ticketmaster supplies one.

## Important
`TICKETMASTER_API_KEY` is blank by default. The website works without it using venue profiles, curfew fallbacks,
and the targeted web-search link. Ticketmaster Discovery API coverage is useful but not universal, so official venue
information and OutLate's fallback model remain necessary.
