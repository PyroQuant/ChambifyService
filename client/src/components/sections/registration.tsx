import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import SuccessModal from "../ui/success-modal";

const registrationSchema = z.object({
  name: z.string().min(3, "Ingresa tu nombre completo"),
  phone: z.string().min(8, "Ingresa un número de teléfono válido"),
  email: z.string().email("Ingresa un email válido").optional().or(z.literal("")),
  university: z.string().optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
  }),
  userType: z.enum(["user", "chamber"]),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const Registration = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"user" | "chamber">("user");

  const userForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      terms: false,
      userType: "user",
    },
  });

  const chamberForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      university: "",
      terms: false,
      userType: "chamber",
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegistrationFormData) => {
      return apiRequest("POST", "/api/register", data);
    },
    onSuccess: () => {
      setShowSuccessModal(true);
      userForm.reset();
      chamberForm.reset();
    },
  });

  const onUserSubmit = (data: RegistrationFormData) => {
    registerMutation.mutate({ ...data, userType: "user" });
  };

  const onChamberSubmit = (data: RegistrationFormData) => {
    registerMutation.mutate({ ...data, userType: "chamber" });
  };

  return (
    <section id="registro" className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            ¡Regístrate ahora y obtén{" "}
            <span className="text-secondary">$20.000 CLP</span> de regalo!
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Solo por pre-registrarte antes del lanzamiento oficial de nuestra
            aplicación. Oferta válida tanto para usuarios como para Chamber.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Usuario Form */}
          <motion.div 
            className="bg-white text-darkText rounded-xl p-8 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-poppins font-bold text-2xl mb-6 text-center text-primary">
              Regístrate como Usuario
            </h3>
            <p className="mb-6 text-center">
              ¿Necesitas ayuda con cargas pesadas? Regístrate y obtén $20.000 CLP
              de descuento en tu primer servicio.
            </p>

            <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
              <div>
                <label htmlFor="user-name" className="block text-sm font-medium mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="user-name"
                  className={`w-full px-4 py-2 border ${userForm.formState.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                  placeholder="Ingresa tu nombre completo"
                  {...userForm.register("name")}
                />
                {userForm.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {userForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="user-phone" className="block text-sm font-medium mb-1">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  id="user-phone"
                  className={`w-full px-4 py-2 border ${userForm.formState.errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                  placeholder="+56 9 1234 5678"
                  {...userForm.register("phone")}
                />
                {userForm.formState.errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {userForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="user-email" className="block text-sm font-medium mb-1">
                  Correo electrónico <span className="text-gray-500">(opcional)</span>
                </label>
                <input
                  type="email"
                  id="user-email"
                  className={`w-full px-4 py-2 border ${userForm.formState.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                  placeholder="tucorreo@ejemplo.com"
                  {...userForm.register("email")}
                />
                {userForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {userForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="user-terms"
                  className="mt-1 mr-2"
                  {...userForm.register("terms")}
                />
                <label htmlFor="user-terms" className="text-sm">
                  Acepto los{" "}
                  <a href="#" className="text-primary hover:underline">
                    términos y condiciones
                  </a>{" "}
                  y autorizo el uso de mis datos para recibir información sobre
                  Chambify.
                </label>
              </div>
              {userForm.formState.errors.terms && (
                <p className="text-sm text-red-500">
                  {userForm.formState.errors.terms.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending && activeTab === "user" ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  "Obtener mi descuento de $20.000 CLP"
                )}
              </button>
            </form>
          </motion.div>

          {/* Chamber Form */}
          <motion.div 
            className="bg-white text-darkText rounded-xl p-8 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-poppins font-bold text-2xl mb-6 text-center text-secondary">
              Regístrate como Chamber
            </h3>
            <p className="mb-6 text-center">
              ¿Eres estudiante universitario y quieres generar ingresos extras?
              Únete a nuestro equipo.
            </p>

            <form onSubmit={chamberForm.handleSubmit(onChamberSubmit)} className="space-y-4">
              <div>
                <label htmlFor="chamber-name" className="block text-sm font-medium mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="chamber-name"
                  className={`w-full px-4 py-2 border ${chamberForm.formState.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors`}
                  placeholder="Ingresa tu nombre completo"
                  {...chamberForm.register("name")}
                />
                {chamberForm.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {chamberForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="chamber-phone" className="block text-sm font-medium mb-1">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  id="chamber-phone"
                  className={`w-full px-4 py-2 border ${chamberForm.formState.errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors`}
                  placeholder="+56 9 1234 5678"
                  {...chamberForm.register("phone")}
                />
                {chamberForm.formState.errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {chamberForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="chamber-university" className="block text-sm font-medium mb-1">
                  Universidad
                </label>
                <input
                  type="text"
                  id="chamber-university"
                  className={`w-full px-4 py-2 border ${chamberForm.formState.errors.university ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors`}
                  placeholder="¿Dónde estudias?"
                  {...chamberForm.register("university")}
                />
                {chamberForm.formState.errors.university && (
                  <p className="mt-1 text-sm text-red-500">
                    {chamberForm.formState.errors.university.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="chamber-email" className="block text-sm font-medium mb-1">
                  Correo electrónico <span className="text-gray-500">(opcional)</span>
                </label>
                <input
                  type="email"
                  id="chamber-email"
                  className={`w-full px-4 py-2 border ${chamberForm.formState.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors`}
                  placeholder="tucorreo@ejemplo.com"
                  {...chamberForm.register("email")}
                />
                {chamberForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {chamberForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="chamber-terms"
                  className="mt-1 mr-2"
                  {...chamberForm.register("terms")}
                />
                <label htmlFor="chamber-terms" className="text-sm">
                  Acepto los{" "}
                  <a href="#" className="text-primary hover:underline">
                    términos y condiciones
                  </a>{" "}
                  y autorizo el uso de mis datos para recibir información sobre
                  Chambify.
                </label>
              </div>
              {chamberForm.formState.errors.terms && (
                <p className="text-sm text-red-500">
                  {chamberForm.formState.errors.terms.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
                disabled={registerMutation.isPending}
                onClick={() => setActiveTab("chamber")}
              >
                {registerMutation.isPending && activeTab === "chamber" ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  "Obtener mi bono de $20.000 CLP"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </section>
  );
};

export default Registration;
