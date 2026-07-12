import { FileText } from "lucide-react";

const SECCIONES = [
  {
    title: "1. Aceptación de los términos",
    desc: "Al registrarte o usar los servicios de Lavandería Jireh, aceptas cumplir con estos términos y condiciones de uso.",
  },
  {
    title: "2. Uso del servicio",
    desc: "Nuestros servicios de lavado, limpieza en seco y planchado están disponibles para clientes registrados. Nos reservamos el derecho de rechazar prendas que no cumplan con nuestras políticas de tratamiento.",
  },
  {
    title: "3. Responsabilidad de las prendas",
    desc: "Aunque tratamos cada prenda con el máximo cuidado, no somos responsables por daños preexistentes, decoloración natural de la tela o prendas que requieran cuidados especiales no informados por el cliente.",
  },
  {
    title: "4. Pagos y tarifas",
    desc: "Las tarifas de nuestros servicios se comunican al momento de recibir el pedido y pueden variar según el tipo de prenda y servicio solicitado.",
  },
  {
    title: "5. Cuentas de usuario",
    desc: "Eres responsable de mantener la confidencialidad de tu cuenta y de toda actividad que ocurra bajo tus credenciales de acceso.",
  },
  {
    title: "6. Modificaciones",
    desc: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán publicados en esta misma página.",
  },
];

export default function TerminosUso() {
  return (
    <div className="bg-white">
      <section className="pt-28 pb-14 bg-gradient-to-br from-primary/8 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark leading-tight">
            Términos de uso
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Conoce las condiciones que rigen el uso de nuestros servicios.
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