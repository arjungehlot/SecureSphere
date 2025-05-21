import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-secureSphere-gray-900 border border-secureSphere-purple-light">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-2xl font-bold flex items-center justify-center gap-2">
            <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
              SecureSphere
            </span>{" "}
            Authentication
          </DialogTitle>
          <DialogDescription className="text-center text-secureSphere-gray-300">
            Sign in to access all features and protect your digital identity
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#5D4FBE",
                    brandAccent: "#7A6ED3",
                    brandButtonText: "white",
                    inputBackground: "#1F2937",
                    inputBorder: "#374151",
                    inputText: "white",
                    inputPlaceholder: "#9CA3AF",
                  },
                  fonts: {
                    bodyFontFamily: "Inter, sans-serif",
                    buttonFontFamily: "Inter, sans-serif",
                    inputFontFamily: "Inter, sans-serif",
                    labelFontFamily: "Inter, sans-serif",
                  },
                  radii: {
                    borderRadiusButton: "0.5rem",
                    buttonBorderRadius: "0.5rem",
                    inputBorderRadius: "0.5rem",
                  },
                },
              },
              className: {
                container: "auth-container",
                button: "auth-button",
                input: "auth-input",
                label: "auth-label",
              },
            }}
            theme="dark"
            providers={["google"]}
            redirectTo={window.location.origin}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
