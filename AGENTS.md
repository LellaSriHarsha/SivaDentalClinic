<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the clinic as a single-page, anchor-based site because its primary journey is immediate appointment or phone conversion.
- Appointment requests remain client-side acknowledgements until a clinic-approved delivery system is connected, preventing false confirmations.
- Appointment rate limiting stores only salted one-way phone/IP fingerprints and timestamps, because patient request contents remain WhatsApp-only.
- Google review excerpts are snapshot content from the verified Places listing and retain reviewer attribution and Google links.
- Use `siva-dental-clinic` as the package name and `SivaDentalClinic` as the repository-facing project name for clear clinic branding.
