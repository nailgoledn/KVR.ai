export default function HowItWorks() {
    const steps = [
      {
        number: "01",
        title: "اكتب فكرتك",
        desc: "صف مشروعك باللغة الطبيعية دون الحاجة لأي خبرة برمجية.",
      },
      {
        number: "02",
        title: "تحليل الذكاء الاصطناعي",
        desc: "يقوم KVRAT AI بتحليل الفكرة واستخراج جميع المتطلبات.",
      },
      {
        number: "03",
        title: "بناء المشروع",
        desc: "يتم إنشاء الـ Backend والـ Frontend وقاعدة البيانات وواجهات API.",
      },
      {
        number: "04",
        title: "جاهز للإطلاق",
        desc: "احصل على مشروع احترافي جاهز للتطوير أو النشر.",
      },
    ];
  
    return (
      <section
        id="how-it-works"
        style={{
          maxWidth: 1200,
          margin: "100px auto",
          padding: "0 30px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 42,
            color: "#fff",
            marginBottom: 60,
          }}
        >
          كيف يعمل KVRAT.ai؟
        </h2>
  
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 25,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                background: "#111827",
                border: "1px solid #1E293B",
                borderRadius: 20,
                padding: 30,
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#00E5FF",
                  marginBottom: 20,
                }}
              >
                {step.number}
              </div>
  
              <h3
                style={{
                  color: "#fff",
                  marginBottom: 15,
                }}
              >
                {step.title}
              </h3>
  
              <p
                style={{
                  color: "#CBD5E1",
                  lineHeight: 1.8,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }