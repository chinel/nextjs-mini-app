export async function getAllEvents() {
  const response = fetch(
    "https://nextjs-course-58c16-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  const events = [];

  for (const key of data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}
