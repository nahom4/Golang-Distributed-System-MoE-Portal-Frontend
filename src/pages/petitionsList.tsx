import { useState, useMemo } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  FileText,
  CheckCircle2,
  Plus,
  Calendar,
  Users,
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  BookOpen,
} from "lucide-react";
import { Header } from "../components/Header";
import { useGetAllPetitionsQuery } from "../redux rtk/apiSlice";
import {
  useSignPetitionMutation,
  useGetAllSignatoriesQuery,
} from "../redux rtk/apiSlice";
import { PetitionTile } from "../components/petitionTile";

export default function PetitionsList() {
  const { data: petitions = [], error, isSuccess } =
    useGetAllPetitionsQuery(undefined);
 

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPetitions = useMemo(() => {
    return petitions.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [petitions, searchTerm, statusFilter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-8 w-[80%] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          {/* <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Student Petitions
            </h1>
            <p className="text-gray-600 mt-1">
              Browse and manage active petitions in the Ethiopian Ministry of
              Education system.
            </p>
          </div> */}
          <Badge className="mt-4 md:mt-0 bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-2">
            <BookOpen className="h-4 w-4 mr-2" />
            {filteredPetitions.length} Active Petitions
          </Badge>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex items-center gap-2 w-full md:w-1/2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search petitions..."
              className="flex-1 outline-none border-none text-gray-700 placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 ">
            <select
              className="border border-green-400 rounded-md px-3 py-2 text-sm text-gray-700 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
        
          </div>
        </div>

        {/* Petitions List */}
        {isSuccess && filteredPetitions.length === 0 ? (
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Petitions Found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter to find what you’re looking
                for.
              </p>
              <Button onClick={() => {
              window.location.href = "/create-petition";
            }} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" /> Create Petition
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPetitions.map((petition, index) => (
              <PetitionTile petition = {petition} index = {index}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
