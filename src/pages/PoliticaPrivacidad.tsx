import { ShieldCheck } from "lucide-react";

const SECCIONES = [
  {
    title: "1. Información que recopilamos",
    desc: "Recopilamos datos como nombres, apellidos, DNI, teléfono, correo electrónico y dirección al momento de registrarte o realizar un pedido en Lavandería Jireh.",
  },
  {
    title: "2. Uso de la información",
    desc: "Utilizamos tus datos para gestionar tus pedidos, brindarte soporte, enviarte notificaciones sobre el estado de tu ropa y mejorar nuestros servicios.",
  },
  {
    title: "3. Protección de datos",
    desc: "Implementamos medidas de seguridad razonables para proteger tu información personal contra accesos no autorizados, pérdida o uso indebido.",
  },
  {
    title: "4. Compartir información",
    desc: "No vendemos ni compartimos tu información personal con terceros, salvo cuando sea necesario para cumplir con obligaciones legales.",
  },
  {
    title: "5. Tus derechos",
    desc: "Puedes solicitar el acceso, actualización o eliminación de tus datos personales contactándonos a través de nuestro correo de soporte.",
  },
  {
    title: "6. Cambios en esta política",
    desc: "Podemos actualizar esta política de privacidad periódicamente. Te recomendamos revisarla con regularidad para estar informado de cualquier cambio.",
  },
];

export default function PoliticaPrivacidad() {
  return (
    <div className="bg-white">
      <section className="pt-28 pb-14 bg-gradient-to-br from-primary/8 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark leading-tight">
            Política de privacidad
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Tu confianza es importante para nosotros. Así protegemos y usamos tu información.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          {SECCIONES.map(({ title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-2xl p-6">
              <h2 className="font-bold text-dark text-lg mb-2">{title}</h2>
              <p className="text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
          <p className="text-sm text-gray-400 text-center pt-6">
            Última actualización: julio 2026. Ante cualquier duda, escríbenos a soporte@jireh.com
          </p>
        </div>
      </section>
    </div>
  );
}