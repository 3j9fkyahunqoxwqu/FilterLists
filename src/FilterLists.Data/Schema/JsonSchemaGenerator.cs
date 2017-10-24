﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using FilterLists.Data.Models.Implementations;
using Newtonsoft.Json.Schema.Generation;

namespace FilterLists.Data.Schema
{
    public static class JsonSchemaGenerator
    {
        public static void WriteSchemaToFiles()
        {
            foreach (var type in GetTypesInNamespace(Assembly.GetExecutingAssembly(),
                "FilterLists.Data.Models.Implementations"))
            {
                if (type == typeof(BaseEntity)) continue;
                WriteSchemaToFile(type);
            }
        }

        private static void WriteSchemaToFile(Type type)
        {
            File.WriteAllText(
                Path.GetFullPath(Path.Combine(AppContext.BaseDirectory + @"\", @"..\..\..\..\..\data\schema\")) +
                type.Name + ".json", new JSchemaGenerator().Generate(type).ToString());
        }

        private static IEnumerable<Type> GetTypesInNamespace(Assembly assembly, string @namespace)
        {
            return assembly.GetTypes().Where(t => string.Equals(t.Namespace, @namespace, StringComparison.Ordinal));
        }
    }
}