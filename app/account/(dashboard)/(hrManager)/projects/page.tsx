"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MdTune } from "react-icons/md";
import useCompany from "@/lib/hooks/company/useCompany";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/projects";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", category: "", status: "", deadline: "" });
  const [filters, setFilters] = useState({ category: "", status: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const userId = localStorage.getItem("userId");
  const [companyId, setCompanyId] = useState<string | null>(null);
  const { fetchCompanyIdByUserId } = useCompany();

  useEffect(() => {
    const fetchCompany = async () => {
      if (userId) {
        const id = await fetchCompanyIdByUserId(userId);
        setCompanyId(id);
      }
    };
    fetchCompany();
  }, [userId]);

  const filteredProjects = Array.isArray(projects) ? projects.filter((project) => {
    return (!filters.category || project.category === filters.category) &&
           (!filters.status || project.status === filters.status);
  }) : [];
  
  
  useEffect(() => {
    if (companyId) {
      console.log("Company ID set:", companyId);
      fetchProjects();
    }
  }, [companyId]);

  const fetchProjects = async () => {
    if (!companyId) return;
    console.log("Fetching projects with companyId:", companyId);
    try {
      const response = await axios.get(`${API_URL}`, { params: { companyId } });
      console.log("Projects fetched:", response.data);
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  
  const handleFilterChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e: any) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const addProject = async () => {
    const { name, category, status, deadline } = newProject;
    if (!name.trim() || !category.trim() || !status.trim() || !deadline.trim()) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(API_URL, { ...newProject, companyId: companyId });
      setProjects([...projects, response.data]);
      setNewProject({ name: "", category: "", status: "", deadline: "" });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const filterProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}`, { params: { ...filters, companyId: companyId } });
      setProjects(response.data);
    } catch (error) {
      console.error("Error filtering projects:", error);
    }
    closeFilter();
  };

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3 || ~~(day % 100 / 10) === 1) ? 0 : day % 10];
    
    return `${day}${suffix} ${date.toLocaleString("en-US", { month: "long" })}, ${date.getFullYear()}`;
  };  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4 bg-purple-500 hover:text-purple-500 text-white">Add Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input type="text" name="name" placeholder="Project Name" value={newProject.name} onChange={handleInputChange} />
              <Input type="text" name="category" placeholder="Category" value={newProject.category} onChange={handleInputChange} />
              <select name="status" value={newProject.status} onChange={handleInputChange} className="border p-2 rounded bg-transparent">
                <option value="">Select Status</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
              <Input type="date" name="deadline" value={newProject.deadline} onChange={handleInputChange} />
            </div>
            <Button onClick={addProject} className="mt-4 w-full bg-purple-500 text-white py-2 rounded">Add Project</Button>
          </DialogContent>
        </Dialog>
        <Button variant="outline" className="bg-transparent" onClick={openFilter}><MdTune /> Filter</Button>
      </div>
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogTrigger className="hidden"></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Projects</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input name="category" value={filters.category} onChange={handleFilterChange} placeholder="Category" />
            <Input name="status" value={filters.status} onChange={handleFilterChange} placeholder="Status" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={closeFilter}>Cancel</Button>
            <Button className="bg-[#7152F3] hover:text-[#7152F3] text-white" onClick={filterProjects}>Filter</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="p-4 border rounded shadow-md">
              <h2 className="font-semibold pb-4">{project.name}</h2>
              <div className="flex flex-wrap gap-2">
                <p className="text-sm text-white font-bold bg-red-400 py-1 px-4 rounded-full inline-block">{project.category}</p>
                <p className="text-sm text-[#3FC28A] bg-[#3FC28A16] py-1 px-4 rounded-full inline-block">{project.status}</p>
                <p className="text-sm bg-[#F45B6916] text-[#F45B69] py-1 px-4 rounded-full inline-block">Deadline: {formatDate(project.deadline)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects found</p>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
