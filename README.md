# SivaDentalClinic

The official website for **Dr. SIVA'S Multispeciality Dental Clinic** in Valasaravakkam, Chennai.

**Created and maintained by Sri Harsha.**

## About the project

SivaDentalClinic is a responsive, single-page clinic website designed to help patients quickly:

- Understand the clinic's dental services
- Call or message the clinic on WhatsApp
- Prepare an appointment request using available time slots
- Find the clinic through Google Maps
- Read attributed reviews from the clinic's verified Google listing
- See that the clinic is open every day, including Sundays

The experience is optimized for desktop and mobile devices, with persistent quick actions that keep calling, directions, WhatsApp, and appointment booking easy to reach.

## Main features

### Appointment requests

- Requires the patient's full name and Indian mobile number
- Offers 30-minute preferred time slots from 9:00 AM to 10:30 PM
- Validates all fields before preparing a request
- Opens a preformatted WhatsApp message for the patient to send to the clinic
- Does not store the patient's appointment details on the website
- Limits repeated requests from the same phone or network to reduce automated abuse

An appointment is not automatically confirmed. The clinic receives the request only after the patient sends the prepared WhatsApp message and can then respond directly.

### Clinic information

- Responsive navigation and mobile action bar
- Service and patient-experience sections
- Prominent Sunday and seven-day opening information
- Direct calling, WhatsApp, directions, and booking actions
- Clinic address and daily opening hours
- Uploaded clinic logo used in the header and browser icon

### Google reviews

- Shows selected review excerpts from the clinic's verified Google listing
- Preserves reviewer attribution and links back to Google
- Uses previous and next controls to browse the featured reviews
- Includes a direct link to view the complete review listing on Google

Review excerpts are snapshots and should be refreshed when the clinic wants newer feedback displayed.

### Security and privacy

- Client-side and server-side input validation
- Hidden spam-trap field for basic bot detection
- Request-body size limits and origin checking
- Privacy-preserving rate limiting using one-way phone and network fingerprints
- No appointment names, messages, phone numbers, or preferred times are saved by the website
- Browser security headers, including content restrictions, transport protection, and referrer controls
- External links opened with appropriate browser protections

## Technology used

| Technology | Purpose |
| --- | --- |
| **React 19** | Builds the interactive user interface and appointment experience |
| **TypeScript** | Adds type safety throughout the project |
| **TanStack Start** | Provides the full-stack React application foundation and server-side capabilities |
| **TanStack Router** | Handles the website route and document metadata |
| **TanStack Query** | Supports structured asynchronous data handling |
| **Vite** | Runs the local development server and creates production builds |
| **Tailwind CSS 4** | Provides responsive styling and the project's design tokens |
| **React Hook Form** | Manages appointment form state and validation feedback |
| **Zod** | Validates appointment data in the browser and at the request endpoint |
| **Radix UI** | Supplies accessible foundations for reusable interface controls |
| **Lucide React** | Provides the interface icons |
| **Cloud PostgreSQL** | Stores only privacy-preserving request-limit fingerprints and timestamps |

## How appointment delivery works

```text
Patient completes the form
          |
          v
Inputs are validated
          |
          v
The repeat-request limit is checked
          |
          v
A WhatsApp message is prepared
          |
          v
Patient taps Send in WhatsApp
          |
          v
Clinic receives a normal WhatsApp message
```

Only the minimum data required for abuse prevention—one-way fingerprints and timestamps—is kept by the rate limiter. The contents of the appointment request remain WhatsApp-only.

## Project structure

```text
SivaDentalClinic/
├── public/                       # Public files, including the browser icon
├── src/
│   ├── assets/                   # Clinic logo and website photography
│   ├── components/ui/            # Reusable accessible interface controls
│   ├── integrations/             # Generated cloud client integration
│   ├── lib/                      # Shared helpers and error handling
│   ├── routes/
│   │   ├── __root.tsx            # Shared document layout and metadata
│   │   ├── index.tsx             # Main single-page clinic website
│   │   └── api/
│   │       └── appointment-check.ts # Appointment validation and rate limiting
│   ├── router.tsx                # Application router
│   ├── server.ts                 # Server entry and security headers
│   ├── start.ts                  # Full-stack application setup
│   └── styles.css                # Design tokens and global styles
├── package.json                  # Commands and dependencies
└── vite.config.ts                # Build configuration
```

## Local development

### Requirements

- Node.js 20 or newer
- Bun 1.2 or newer (recommended because the repository includes `bun.lock`)
- Access to the project's configured cloud environment for testing request throttling

### Installation

```sh
git clone <repository-url>
cd SivaDentalClinic
bun install
bun run dev
```

The local development website is served by Vite. Open the address printed in the terminal.

If Bun is unavailable, npm can also run the project:

```sh
npm install
npm run dev
```

## Available commands

| Command | Description |
| --- | --- |
| `bun run dev` | Starts the local development website |
| `bun run build` | Creates an optimized production build |
| `bun run build:dev` | Creates a build using development settings |
| `bun run preview` | Serves the production build locally for review |
| `bun run lint` | Checks the source code for linting problems |
| `bun run format` | Formats the project files with Prettier |

Replace `bun run` with `npm run` when using npm.

## Configuration

The website's clinic details, WhatsApp destination, Google Maps destination, appointment slots, and featured review excerpts are maintained in the main route source. Cloud connection values are supplied through the project's managed environment and must not be committed as private keys.

Before deploying a separate copy, confirm that the following values belong to the intended clinic:

- Clinic name, phone number, and WhatsApp number
- Street address and Google Maps listing
- Opening hours and Sunday availability
- Featured Google review excerpts and attribution links
- Cloud environment variables and request-limiting function

## Production deployment

1. Install dependencies with `bun install`.
2. Run `bun run lint` and `bun run build`.
3. Confirm that the production cloud environment is connected.
4. Deploy the generated application through a compatible hosting platform.
5. Test calling, directions, WhatsApp delivery, appointment preparation, review links, and mobile navigation on the live domain.

## Current limitations

- Appointment requests are delivered through WhatsApp only; they are not saved as patient records.
- Patients must tap **Send** in WhatsApp before the clinic receives a request.
- The website does not automatically confirm an appointment.
- Featured reviews are manually maintained snapshots rather than a live review feed.
- The site currently displays only reviews that can be individually verified and attributed.

## Author

**Sri Harsha**  
Creator and maintainer of SivaDentalClinic.

## License

This repository is private. No permission is granted to copy, redistribute, or reuse its source code or visual assets without the author's approval.
