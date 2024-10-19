

export const SendDiscordMsg = async (
    name: string,
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_ROOT}/api/v1/discord`,
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        })
      },
    );
    return response;
  };