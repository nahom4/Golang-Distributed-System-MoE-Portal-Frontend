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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

export function PetitionTile({index, petition}) {
    
const { data: signatories, error: signatoriesError } =
useGetAllSignatoriesQuery(petition.title);
return (
<Card
    key={index}
    className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
    onClick={() => {
      localStorage.setItem("title", petition.title);
      window.location.href = "/petition";
    }}
  >
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
          <FileText className="h-6 w-6 text-emerald-700" />
        </div>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formatDate(petition.createdAt)}
        </span>
      </div>
      <CardTitle className="mt-3 text-lg text-gray-900 group-hover:text-emerald-700">
        {petition.title}
      </CardTitle>
      <CardDescription className="line-clamp-2 text-gray-600">
        {petition.text}
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-2 flex justify-between items-center">
      <Badge
        variant="outline"
        className="text-emerald-700 border-emerald-300 bg-emerald-50 text-xs"
      >
        <Users className="h-3 w-3 mr-1" />
        {signatories?.length || 0} signatures
      </Badge>
      <Button variant="ghost" size="sm" className="text-emerald-700">
        View →
      </Button>
    </CardContent>
  </Card>)

}