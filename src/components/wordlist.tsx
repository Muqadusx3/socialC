'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const WordList = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [reportDetails, setReportDetails] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError('User ID not found. Please log in again.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (!userId) return;
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/detected_word/${userId}`);
        console.log("Detected Words Response:", res.data);
        setReportDetails(res.data.data);
      } catch (error) {
        console.error("Error fetching detected words:", error);
        setError('Failed to fetch detected words.');
        setReportDetails({});
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchReport();
    }
  }, [userId]);

  if (loading) return <p className="p-4 text-center text-gray-500 text-sm">Loading detected words...</p>;
  if (error) return <p className="p-4 text-center text-red-600 text-sm">{error}</p>;

  return (
    <div className="w-full max-w-lg mx-auto overflow-x-auto p-2 sm:p-4">
      {reportDetails && Object.keys(reportDetails).length === 0 ? (
        <div className="text-center text-gray-600 text-sm">No abusive words detected for this user.</div>
      ) : (
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-gradient-to-br from-white via-blue-50 to-white ">
          <table className="min-w-full text-sm text-center text-gray-800">
            <thead className="bg-gradient-to-r from-blue-400 to-purple-400 text-white uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b">Detected Word</th>
                <th className="px-4 py-3 border-b">Count</th>
              </tr>
            </thead>
            <tbody>
              {reportDetails &&
                Object.entries(reportDetails).map(([word, count], index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-blue-100 transition-colors border-b"
                  >
                    <td className="px-4 py-2 font-medium">{word}</td>
                    <td className="px-4 py-2 font-bold ">{count}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WordList;
