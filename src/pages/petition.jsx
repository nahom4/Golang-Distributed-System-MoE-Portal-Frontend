import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  useSignPetitionMutation,
  useGetAllSignatoriesQuery,
} from "../redux rtk/apiSlice";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollaborativeTextEditor from "./CollaborativeTextEditor";
import { Header } from "../components/Header";
import {
  GraduationCap,
  Users,
  FileText,
  CheckCircle2,
  PenTool,
  UserCheck,
  TrendingUp,
  Shield,
  Leaf,
  CheckCircle,
} from "lucide-react";


export default function Petition() {
  let title = localStorage.getItem("title");
  const [addSignature, { error: addSignatureError }] =
    useSignPetitionMutation();
  const { data: signatories, error: signatoriesError } =
    useGetAllSignatoriesQuery(title);

   const handleSign = () => {
    let token = localStorage.getItem("token");
    let decodedToken = jwtDecode(token);
    debugger;
    addSignature({ PetitionName: title, UserId: decodedToken.user_id })
      .unwrap()
      .then((res) => {
        toast.success("Signed successfully", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Unable to sign", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  console.log(signatories)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 w-[70%] mx-auto text-sm">
      <ToastContainer />
      <Header />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-gray-900">
                  Ministry Portal
                </h1>
                <p className="text-xs text-gray-600">
                  Ethiopian Education System
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Authenticated
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6 bg-white">
        {/* Petition Header */}
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 border border-green-100/50 shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
              <FileText className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 mb-1">
                    {title} Petition
                  </h1>
                  <p className="text-sm text-gray-600 mb-3">
                    Ethiopian Ministry of Education - Student Petition System
                  </p>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1 text-xs">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      {signatories?.length || 0} Signatures
                    </Badge>
                    <div className="flex items-center gap-1.5 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                      <span className="text-xs font-medium">
                        Active Campaign
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="border-t border-green-100 pt-4">
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                  <PenTool className="h-3.5 w-3.5 text-green-600" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 text-sm">
                    Collaborative Editor
                  </span>
                  <p className="text-xs text-gray-500">
                    Real-time petition editing
                  </p>
                </div>
              </div>
              <Separator orientation="vertical" className="h-6 bg-green-200" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-3.5 w-3.5 text-green-600" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 text-sm">
                    Secure Portal
                  </span>
                  <p className="text-xs text-gray-500">
                    Ministry authenticated access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Petition Editor */}
        <Card className="bg-white/90 backdrop-blur-lg border-green-100/50 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <GraduationCap className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900 mb-0.5">
                  Petition Content
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Collaborate and edit your petition content below
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[500px]">
              <CollaborativeTextEditor title={title} />
            </div>
          </CardContent>
        </Card>

        {/* Action Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sign Petition Card */}
          <Card className="bg-white/90 backdrop-blur-lg border-green-100/50 hover:border-green-200 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl group">
            <CardHeader className="pb-4 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base text-gray-900 mb-0.5">
                    Sign Petition
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-600">
                    Add your signature to support this petition
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Show Your Support
                  </h4>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Do you want to sign this petition and show your support for
                  this important educational initiative?
                </p>
                <Button
                  onClick={handleSign}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white gap-2 py-3 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg"
                  size="sm"
                >
                  <PenTool className="h-4 w-4" />
                  Sign Petition
                </Button>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Your signature will be recorded securely</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signatories List Card */}
          <Card className="bg-white/90 backdrop-blur-lg border-green-100/50 shadow-lg lg:col-span-2 rounded-xl">
            <CardHeader className="border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <UserCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-gray-900 mb-0.5">
                      Petition Signatories
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-600">
                      Students who have signed this petition
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1 text-xs">
                    {signatories?.length || 0} Total Signatures
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {signatories && signatories.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {signatories.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">
                          {item.email}
                        </p>
                        <p className="text-xs text-gray-600">
                          Verified Student · Ministry Portal
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Signed
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    No Signatures Yet
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Be the first to sign this petition and show your support for
                    this important educational cause.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer Information */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 shadow-md rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-gray-600 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-sm"></div>
                  <span className="font-medium">Secure Petition System</span>
                </div>
                <Separator orientation="vertical" className="h-4 bg-green-300" />
                <span className="font-medium">Ethiopian Ministry of Education</span>
                <Separator orientation="vertical" className="h-4 bg-green-300" />
                <span className="font-medium">Student Voice Platform</span>
              </div>
              <div className="text-gray-500 flex items-center gap-1.5 text-xs">
                <Shield className="h-3.5 w-3.5" />
                <span>© 2024 Ethiopian Ministry of Education</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
