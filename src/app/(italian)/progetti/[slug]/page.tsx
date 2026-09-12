import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { projects } from "@/content/projects";
import { projectMetadata } from "@/content/metadata";
const list = projects;
export const dynamicParams = false;
export function generateStaticParams() { return list.map(p=>({slug:p.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=list.find(p=>p.slug===slug);if(!project)notFound();return projectMetadata(project,"it");}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=list.find(p=>p.slug===slug);if(!project)notFound();return <ProjectPage project={project} locale="it"/>;}
