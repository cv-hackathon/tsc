import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import { getAgeChartConfig, getGenderChartConfig, getNavigatorChartConfig, getOrganizationChartConfig, getServiceChartConfig, getStatusChartConfig, getTagChartConfig, getTotalChartConfig } from './chart.config';

export default function AnalysticPage() {
    return (
        <div id="analystic-page">
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 360,
                                }}
                            >
                                <Chart {...getTotalChartConfig()} />
                            </Paper>
                        </Grid>
                        <div id="meetingSDKElement"></div>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 360,
                                }}
                            >
                                <Chart {...getStatusChartConfig()} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 295,
                                        }}
                                    >
                                        <Chart {...getOrganizationChartConfig()} />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 295,
                                        }}
                                    >
                                        <Chart {...getServiceChartConfig()} />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 250,
                                }}
                            >
                                <Chart {...getGenderChartConfig()} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 250,
                                }}
                            >
                                <Chart {...getAgeChartConfig()} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 250,
                                }}
                            >
                                <Chart {...getTagChartConfig()} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 250,
                                }}
                            >
                                <Chart {...getNavigatorChartConfig()} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}