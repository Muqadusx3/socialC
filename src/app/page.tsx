'use client';

import ProtectedLayout from '@/components/ProtectedLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WordList from '@/components/wordlist';

export default function HomePage() {
    const [warnings, setWarnings] = useState(0);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const accountStatus =
        warnings >= 3
            ? 'Account at Risk 🚨'
            : warnings > 0
                ? 'Warning Issued ⚠️'
                : 'Good Standing ✅';

   

    useEffect(() => {
        const id = localStorage.getItem('user_id');
        const authToken = localStorage.getItem('token');
        setUserId(id);
        setToken(authToken);
    }, []);

    useEffect(() => {
        if (!userId || !token) return;

        const fetchUserWarnings = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                setWarnings(res.data.data.warnings || 0);
            } catch (error) {
                console.error('Error fetching warnings:', error);
            }
        };

        fetchUserWarnings();
    }, [userId, token]);

    return (
        <ProtectedLayout>
            <div className="min-h-screen w-full pt-4 bg-gradient-to-r from-blue-50 to-purple-100 mt-9 sm:mt-0">
                <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
                    {/* Account Status */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                            Account Status
                        </h2>
                        <p className="text-lg sm:text-xl font-medium text-gray-700">{accountStatus}</p>
                        <p className="text-sm text-gray-500 mt-1">Warnings Issued: {warnings}</p>
                    </div>

                    {/* Detected Words */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                            Your Activity (Detected Words)
                        </h2>
                        <WordList />
                    </div>
                    
                </div>

            </div>
        </ProtectedLayout>
    );
}
