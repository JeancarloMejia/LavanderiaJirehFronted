import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const INFO_CARDS = [
  { icon: Phone, color: "text-blue-600",  bg: "bg-blue-50",  title: "Teléfono",  desc: "+51 987 654 321" },
  { icon: Mail,  color: "text-pink-600",  bg: "bg-pink-50",  title: "Correo",    desc: "soporte@jireh.com" },
  { icon: MapPin, color: "text-teal-600", bg: "bg-teal-50",  title: "Ubicación", desc: "Los Olivos, Lima, Perú" },
  { icon: Clock, color: "text-amber-600", bg: "bg-amber-50", title: "Horario",   desc: "Lun–Sáb: 7:00 am – 9:00 pm" },
];

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.nombre && form.correo && form.mensaje) {
      setSent(true);
      setForm({ nombre: "", correo: "", mensaje: "" });
    }
  };

  const inputCls =
    "w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

  return (
    <div className="bg-white">
      <section className="pt-28 pb-14 bg-gradient-to-br from-primary/8 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Hablemos
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark leading-tight">
            ¿Tienes alguna pregunta?<br className="hidden sm:block" /> Contáctanos
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Escríbenos y te responderemos a la brevedad. Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {INFO_CARDS.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-bold text-dark mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-dark mb-3">¡Mensaje enviado!</h2>
                <p className="text-gray-500 leading-relaxed">
                  Gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico</label>
                  <input
                    name="correo"
                    type="email"
                    value={form.correo}
                    onChange={handleChange}
                    placeholder="correo@email.com"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                    rows={5}
                    className={inputCls}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}