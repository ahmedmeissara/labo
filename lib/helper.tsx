const BASE_URL = "https://labo-jet.vercel.app/";

// Get all specimens
export const getSpecimens = async () => {
  const response = await fetch(`${BASE_URL}api/specimens`);
  const json = await response.json();
  return json;
};

// Get a specimen by ID
export const getSpecimen = async (specimenId: any) => {
  const response = await fetch(`${BASE_URL}api/specimens/${specimenId}`);
  const json = await response.json();
  if (json) return json;
  return {};
};

// Add a new specimen
export async function addSpecimen(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${BASE_URL}api/specimens`, Options);
  } catch (error) {
    return error;
  }
}


// Update a specimen by ID
export async function updateSpecimen(specimenId: any, formData: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${BASE_URL}api/specimens/${specimenId}`, Options);
  const json = await response.json();
  return json;
}


// Delete a specimen by ID
export async function deleteSpecimen(specimenId: any) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${BASE_URL}api/specimens/${specimenId}`, Options);
  const json = await response.json();
  return json;
}
