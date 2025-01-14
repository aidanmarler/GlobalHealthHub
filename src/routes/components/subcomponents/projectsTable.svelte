<script lang="ts">
	import type { Project } from '$lib/types';

	let { projects, properties }: { projects: Project[]; properties: Array<keyof Project> } =
		$props();

	console.log(properties);
</script>

<table>
	<tbody>
		<tr>
			<th>Company</th>
			<th>Contact</th>
			<th>Country</th>
		</tr>
		<tr>
			<td>Alfreds Futterkiste</td>
			<td>Maria Anders</td>
			<td>Germany</td>
		</tr>
		<tr>
			<td>Centro comercial Moctezuma</td>
			<td>Francisco Chang</td>
			<td>Mexico</td>
		</tr>
	</tbody>
</table>
