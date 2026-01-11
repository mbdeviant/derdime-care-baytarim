import Link from "next/link";
import { fetchPDFsByLesson } from "@/lib/drive";

type Props = {
  params: {
    slug: string;
  };
};

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const pdfs = await fetchPDFsByLesson(slug);

  // sort so that oldest comes first and newest is last
  const sortedPdfs = [...pdfs].sort((a, b) => {
    return (
      new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime()
    );
  });

  return (
    <main style={{ padding: 32 }}>
      {sortedPdfs.length === 0 && <p>Bu ders icin henuz not yuklenmedi.</p>}

      {sortedPdfs.map((pdf) => (
        <section
          key={pdf.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 16,
            // border: "1px solid #eee",
            padding: "12px 16px",
            borderRadius: 8,
            background: "transparent",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 52,
                background: "#f2f2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                fontWeight: 700,
                color: "#666",
              }}
            >
              PDF
            </div>

            <div>
              <a
                href={`https://drive.google.com/file/d/${pdf.id}/view`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "gray-400",
                  textDecoration: "none",
                  marginBottom: 4,
                }}
              >
                {pdf.name.replace(/\.pdf$/i, "")}
              </a>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={`https://drive.google.com/uc?id=${pdf.id}&export=download`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 12px",
                background: "#DAA520",
                color: "black",
                fontWeight: "bold",
                borderRadius: 6,
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              İndir
            </a>
          </div>
        </section>
      ))}

      <Link
        href="/"
        role="button"
        style={{
          color: "#DAA520",
          textDecoration: "none",
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        &#8592;anasayfa
      </Link>
    </main>
  );
}
