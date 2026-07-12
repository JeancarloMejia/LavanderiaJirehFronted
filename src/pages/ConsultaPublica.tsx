import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, WashingMachine, Package, Clock, CheckCircle2, XCircle, Loader2, ShieldCheck, Sparkles, Phone } from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import api from "@/lib/api";
import type { EstadoPedidoValue } from "@/types";

interface PedidoPublico {
  codigo: string;
  cliente: string;
  estado_actual: EstadoPedidoValue;
  fecha_ingreso: string;
  fecha_entrega: string | null;
  total: string;
  historial: { estado: string; descripcion: string | null; fecha: string }[];
}

const ESTADO_ICONS: Record<string, React.ReactNode> = {
  pendiente:  <Clock className="w-5 h-5 text-amber-500" />,
  en_proceso: <Loader2 className="w-5 h-5 text-primary animate-spin" />,
  listo:      <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  entregado:  <CheckCircle2 className="w-5 h-5 text-gray-400" />,
  cancelado:  <XCircle className="w-5 h-5 text-red-500" />,
};

const ESTADO_LABELS: Record<string, string> = {
  pendiente:  "Pendiente",
  en_proceso: "En proceso",
  listo:      "Listo para recoger",
  entregado:  "Entregado",
  cancelado:  "Cancelado",
};

const ESTADOS_TIMELINE: EstadoPedidoValue[] = ["pendiente", "en_proceso", "listo", "entregado"];

const FEATURES = [
  { icon: Sparkles,    color: "text-primary",    bg: "bg-primary/10", title: "En tiempo real",   desc: "Actualizado al instante" },
  { icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", title: "Seguro",           desc: "Solo con tu código" },
  { icon: Package,     color: "text-amber-600",   bg: "bg-amber-50",   title: "Historial completo", desc: "Cada paso del proceso" },
];

function estadoIndex(e: EstadoPedidoValue) {
  return ESTADOS_TIMELINE.indexOf(e);
}

export function ConsultaPublica() {
  const [codigo, setCodigo] = useState("");
  const [pedido, setPedido] = useState<PedidoPublico | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscar = async () => {
    if (!codigo.trim()) return;
    setLoading(true);
    setError("");
    setPedido(null);
    try {
      const res = await api.get(`/api/pedido/${codigo.trim().toUpperCase()}/`);
      setPedido(res.data);
    } catch {
      setError("No encontramos ningún pedido con ese código. Verifica e intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = pedido ? estadoIndex(pedido.estado_actual) : -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-gray-50 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-xl relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mb-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 mb-4"
          >
            <WashingMachine className="w-8 h-8 text-white" />
          </motion.div>
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-2">
            Seguimiento de pedido
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-dark">Lavandería Jireh</h1>
          <p className="text-gray-500 text-sm mt-2 max-w-sm">
            Ingresa tu código y descubre en segundos en qué etapa está tu ropa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl shadow-primary/5"
        >
          <p className="text-gray-600 text-sm mb-3 font-medium">Ingresa tu código de pedido</p>
          <div className="flex gap-2">
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && buscar()}
              placeholder="Ej: LAV-AB12CD"
              className="flex-1 bg-gray-50 border border-gray-200 text-dark placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={buscar}
              disabled={loading || !codigo.trim()}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl px-4 py-3 transition-all flex items-center gap-2 font-medium text-sm cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Buscar
            </motion.button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 overflow-hidden"
              >
                <p className="text-red-500 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {!pedido && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="grid grid-cols-3 gap-3 mt-5"
            >
              {FEATURES.map(({ icon: Icon, color, bg, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center"
                >
                  <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <p className="text-xs font-bold text-dark leading-tight">{title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {pedido && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-5 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-wider">Código</p>
                    <p className="text-2xl font-bold font-mono">{pedido.codigo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs">Total</p>
                    <p className="text-xl font-bold">{formatCurrency(pedido.total)}</p>
                  </div>
                </div>
                <p className="mt-2 text-white/90 text-sm">{pedido.cliente}</p>
              </div>

              <div className="px-6 py-5 space-y-6">
                {pedido.estado_actual !== "cancelado" && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Progreso</p>
                    <div className="flex items-center gap-0">
                      {ESTADOS_TIMELINE.map((e, i) => (
                        <div key={e} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center">
                            <div
                              className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                                i <= currentStep
                                  ? "bg-primary text-white shadow-md shadow-primary/30"
                                  : "bg-gray-100 text-gray-400"
                              )}
                            >
                              {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                            </div>
                            <p className={cn(
                              "text-xs mt-1.5 font-medium text-center w-16",
                              i <= currentStep ? "text-primary" : "text-gray-400"
                            )}>
                              {ESTADO_LABELS[e]}
                            </p>
                          </div>
                          {i < ESTADOS_TIMELINE.length - 1 && (
                            <div className={cn(
                              "flex-1 h-0.5 mb-5 mx-1 transition-all",
                              i < currentStep ? "bg-primary" : "bg-gray-200"
                            )} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  {ESTADO_ICONS[pedido.estado_actual]}
                  <div>
                    <p className="text-xs text-gray-400">Estado actual</p>
                    <p className="text-sm font-semibold text-dark">
                      {ESTADO_LABELS[pedido.estado_actual]}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Fecha de ingreso</p>
                    <p className="text-sm text-gray-600 mt-0.5">{formatDate(pedido.fecha_ingreso)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Entrega estimada</p>
                    <p className="text-sm text-gray-600 mt-0.5">{formatDate(pedido.fecha_entrega)}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-gray-400" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Historial</p>
                  </div>
                  <div className="space-y-2.5">
                    {pedido.historial.map((h, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className="flex flex-col items-center mt-1">
                          <div className={cn(
                            "w-2 h-2 rounded-full shrink-0",
                            i === pedido.historial.length - 1 ? "bg-primary" : "bg-gray-300"
                          )} />
                          {i < pedido.historial.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                        </div>
                        <div className="pb-2">
                          <p className="font-medium text-dark capitalize">{h.estado.replace("_", " ")}</p>
                          <p className="text-xs text-gray-400">{formatDate(h.fecha)}</p>
                          {h.descripcion && <p className="text-xs text-gray-500 mt-0.5">{h.descripcion}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mt-6"
        >
          <Phone className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-center text-gray-400 text-xs">
            ¿Necesitas ayuda? Llámanos o visítanos en nuestra tienda.
          </p>
        </motion.div>
      </div>
    </div>
  );
}