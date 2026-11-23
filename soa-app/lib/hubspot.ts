interface UpsertInput {
  idProperty: string;
  id: string;
  properties: Record<string, string>;
}

function splitName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

async function batchUpsertContacts(inputs: UpsertInput[]): Promise<void> {
  const token = process.env.HUBSPOT_API_TOKEN;
  if (!token) {
    console.warn("HUBSPOT_API_TOKEN not set — skipping HubSpot sync");
    return;
  }

  const res = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error(`HubSpot upsert failed (${res.status}):`, body);
  }
}

export async function syncSOAToHubSpot({
  requestorName,
  requestorEmail,
  phone,
  jobTitle,
  registrationType,
  headcount,
  companyName,
  registrants,
}: {
  requestorName: string;
  requestorEmail: string;
  phone: string;
  jobTitle: string;
  registrationType: string;
  headcount: string;
  companyName: string;
  registrants: { name: string; email: string }[];
}): Promise<void> {
  const { firstname, lastname } = splitName(requestorName);

  const inputs: UpsertInput[] = [
    // Requestor — full details
    {
      idProperty: "email",
      id: requestorEmail,
      properties: {
        email: requestorEmail,
        firstname,
        lastname,
        phone,
        jobtitle: jobTitle,
        company: companyName,
        // HubSpot standard property: number of employees (company headcount)
        numemployees: headcount,
        event_registration_type: registrationType,
      },
    },
    // Registrants — name, email, company, headcount, registration type
    ...registrants
      .filter((r) => r.email !== requestorEmail)
      .map((r) => {
        const { firstname: fn, lastname: ln } = splitName(r.name);
        return {
          idProperty: "email",
          id: r.email,
          properties: {
            email: r.email,
            firstname: fn,
            lastname: ln,
            company: companyName,
            numemployees: headcount,
            event_registration_type: registrationType,
          },
        };
      }),
  ];

  await batchUpsertContacts(inputs);
}
