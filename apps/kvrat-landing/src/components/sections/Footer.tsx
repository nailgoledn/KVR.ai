export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 120,
        padding: "60px 30px",
        borderTop: "1px solid #1e293b",
        background: "#020617",
        color: "#94a3b8",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 20, fontSize: 20, color: "#fff" }}>
        KVRAT.ai
      </div>

      <p style={{ marginBottom: 20, lineHeight: 1.8 }}>
        منصة ذكية لتحويل الأفكار إلى منتجات رقمية باستخدام الذكاء الاصطناعي
      </p>

      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
        <span>الرئيسية</span>
        <span>المنتجات</span>
        <span>عن المنصة</span>
        <span>تواصل</span>
      </div>

      <div style={{ marginTop: 30, fontSize: 12, color: "#64748b" }}>
        © 2026 KVRAT.ai - All rights reserved
      </div>
    </footer>
  );
}