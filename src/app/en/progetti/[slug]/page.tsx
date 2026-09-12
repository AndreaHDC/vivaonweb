import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { englishProjects } from "@/content/projects-en";
import { projectMetadata } from "@/content/metadata";
const list = englishProjects;
export const dynamicParams = false;
export function generateStaticParams() { return list.map(p=>({slug:p.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=list.find(p=>p.slug===slug);if(!project)notFound();return projectMetadata(project,"en");}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=list.find(p=>p.slug===slug);if(!project)notFound();return <ProjectPage project={project} locale="en"/>;}
