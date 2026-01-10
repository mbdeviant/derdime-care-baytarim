import Link from "next/link";

const lessons = [
  { slug: "turkce", title: "Türkçe" },
  { slug: "tarih", title: "Tarih" },
  { slug: "cografya", title: "Coğrafya" },
  { slug: "vatandaslik", title: "Vatandaşlık" },
];

export default function Home() {
  return (
    <main
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "row",
        gap: 32,
        fontSize: 16,
      }}
    >
      {lessons.map((lesson) => (
        <Link
          key={lesson.slug}
          href={`/ders/${lesson.slug}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          📁
          <span style={{ marginTop: 5 }}>{lesson.title}</span>
        </Link>
      ))}
    </main>
  );
}
