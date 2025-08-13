export default function FormContainer({ title, subtitle, children }) {
  return (
    <div className="cp-page">
      <div className="cp-card">
        {title && <h1 className="cp-title">{title}</h1>}
        <div className="cp-rule" />
        {subtitle && <p className="cp-subtle -mt-2">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
