const PersonPage = async ({
  params,
}: {
  params: Promise<{ personId: string }>;
}) => {
  const personId = (await params).personId;
  return <div>{personId}</div>;
};

export default PersonPage;
