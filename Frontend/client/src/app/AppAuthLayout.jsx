import { Outlet } from "react-router-dom";
import React from "react";

export default function AppAuthLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <main className="flex-1 flex item-center justify-center">
                <Outlet /> {/* Login/ signup will render here */}
            </main>
        </div>
    );
}