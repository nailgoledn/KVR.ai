export default function Features() {
    const features = [
      {
        title: "AI Project Builder",
        desc: "حوّل فكرتك إلى مشروع متكامل خلال دقائق.",
      },
      {
        title: "NestJS Backend",
        desc: "إنشاء Backend احترافي باستخدام NestJS.",
      },
      {
        title: "Next.js Frontend",
        desc: "واجهة حديثة وسريعة باستخدام Next.js.",
      },
      {
        title: "Flutter Mobile",
        desc: "تطبيقات Android و iOS تلقائياً.",
      },
      {
        title: "Dashboard",
        desc: "لوحة تحكم متكاملة للإدارة.",
      },
      {
        title: "API Generator",
        desc: "إنشاء REST API بشكل تلقائي.",
      },
    ];
  
    return (
      <section
        id="features"
        style={{
          maxWidth: 1200,
          margin: "80px auto",
          padding: "0 30px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 42,
            marginBottom: 50,
            color: "#fff",
          }}
        >
          ماذا يقدم KVRAT.ai؟
        </h2>
  
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 24,
          }}
        >
          {features.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#111827",
                border: "1px solid #1e293b",
                borderRadius: 18,
                padding: 30,
                transition: ".3s",
              }}
            >
              <h3
                style={{
                  color: "#00E5FF",
                  marginBottom: 15,
                  fontSize: 22,
                }}
              >
                {item.title}
              </h3>
  
              <p
                style={{
                  color: "#CBD5E1",
                  lineHeight: 1.8,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }