import ProfileCard from "@/components/profile/ProfileCard";

async function getProfiles() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/profile`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

const ExpertsPage = async () => {
  const profiles: any[] = await getProfiles();

  const cards = profiles?.map((d: any, index: any) => {
    const { image } = d;
    return (
      <ProfileCard
        key={index}
        name={d.name}
        title={d.title}
        image={image}
        id={index}
        slug={d.slug}
      />
    );
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-10 m-5 items-center justify-center">
        {cards}
      </div>
    </div>
  );
};

export default ExpertsPage;
