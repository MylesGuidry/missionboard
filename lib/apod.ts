export type Apod = {
    title: string;
    explanation: string;
    url: string;
    mediaType: string;
  };
  
  export async function getApod(): Promise<Apod> {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
      {
        next: {
          revalidate: 3600,
        },
      }
    );
  
    if (!response.ok) {
        console.log("NASA ERROR:", response.status);
        console.log(await response.text());
        throw new Error("Failed to fetch NASA APOD data");
      }
  
    const data = await response.json();
  
    return {
      title: data.title,
      explanation: data.explanation,
      url: data.url,
      mediaType: data.media_type,
    };
  }