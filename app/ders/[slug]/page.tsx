type Props = {
  params: {
    slug: string;
  };
};

export default async function LessonPage({ params }: Props) {
  const resolvedParams = await params;
  return (
    <main style={{ padding: 32 }}>
      <p>Burasi {resolvedParams.slug} notlarinin olacagi sayfa.</p>
    </main>
  );
}
