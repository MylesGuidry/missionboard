export type Launch = {
    id: string;
    mission: string;
    agency: string;
    rocket: string;
    location: string;
    status: string;
    launchTime: string;
  };
  
  export async function getUpcomingLaunches(): Promise<Launch[]> {
    const response = await fetch(
      "https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=5",
      {
        next: {
          revalidate: 3600,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch launch data");
    }
  
    const data = await response.json();
  
    return data.results.map((launch: any) => ({
      id: launch.id,
      mission: launch.name,
      agency: launch.launch_service_provider?.name ?? "Unknown Agency",
      rocket: launch.rocket?.configuration?.name ?? "Unknown Rocket",
      location: launch.pad?.location?.name ?? "Unknown Location",
      status: launch.status?.name ?? "Unknown Status",
      launchTime: launch.net,
    }));
  }